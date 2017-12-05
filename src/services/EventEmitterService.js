// event_emitter.js

const slice = Array.prototype.slice;
// Regular expression used to split event strings.
const eventSplitter = /\s+/;
// Implement fancy features of the Events API such as multiple event
// names `"change blur"` and jQuery-style event maps `{change: action}`
// in terms of the existing API.

import * as _ from 'lodash'

const eventsApi = function (obj, action, name, rest) {
  if (!name) {
    return true;
  }
  
  // Handle event maps.
  if (name !== null && typeof name === 'object') {
    for (const key in name) {
      if (name.hasOwnProperty(key)) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    }
    
    return false;
  }
  
  // Handle space separated event names.
  if (eventSplitter.test(name)) {
    const names = name.split(eventSplitter);
    for (let i = 0, length = names.length; i < length; i++) {
      obj[action].apply(obj, [names[i]].concat(rest));
    }
    
    return false;
  }
  
  return true;
};

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy (most internal
// Backbone events have 3 arguments).
const triggerEvents = function (events, args) {
  let ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
  switch (args.length) {
    case 0: while (++i < l) {
      (ev = events[i]).callback.call(ev.ctx);
    } return;
    
    case 1: while (++i < l) {
      (ev = events[i]).callback.call(ev.ctx, a1);
    } return;
    
    case 2: while (++i < l) {
      (ev = events[i]).callback.call(ev.ctx, a1, a2);
    } return;
    
    case 3: while (++i < l) {
      (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
    } return;
    
    default: while (++i < l) {
      (ev = events[i]).callback.apply(ev.ctx, args);
    } return;
  }
};

export class EventEmitter {
  
  on() {
    return EventEmitter.on.apply(this, arguments);
  }
  
  once() {
    return EventEmitter.once.apply(this, arguments);
  }
  
  off() {
    return EventEmitter.off.apply(this, arguments);
  }
  
  trigger() {
    return EventEmitter.trigger.apply(this, arguments);
  }
  
  stopListening() {
    return EventEmitter.stopListening.apply(this, arguments);
  }
  
  emit() {
    return EventEmitter.emit.apply(this, arguments);
  }
  
  
  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  static on(name, callback, context) {
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) {
      return this;
    }
    if (!this._events) {
      this._events = {};
    }
    const events = this._events[name] || (this._events[name] = []);
    events.push({ callback: callback, context: context, ctx: context || this });
    return this;
  }
  
  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, it will be removed.
  static once(name, callback, context) {
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) {
      return this;
    }
    
    const once = _.once(() => {
      this.off(name, once);
      callback.apply(this, arguments);
    });
    
    once._callback = callback;
    return this.on(name, once, context);
  }
  
  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  static off(name, callback, context) {
    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) {
      return this;
    }
    
    // Remove all callbacks for all events.
    if (!name && !callback && !context) {
      this._events = void 0;
      return this;
    }
    
    const names = name ? [name] : _.keys(this._events);
    for (let i = 0, length = names.length; i < length; i++) {
      const evt = names[i];
      // Bail out if there are no events stored.
      const events = this._events[evt];
      if (!events) {
        continue;
      }
      
      // Remove all callbacks for this event.
      if (!callback && !context) {
        delete this._events[evt];
        continue;
      }
      
      // Find any remaining events.
      const remaining = [];
      for (let j = 0, k = events.length; j < k; j++) {
        const event = events[j];
        if (
          callback && callback !== event.callback &&
          callback !== event.callback._callback ||
          context && context !== event.context
        ) {
          remaining.push(event);
        }
      }
      
      // Replace events if there are any remaining.  Otherwise, clean up.
      if (remaining.length) {
        this._events[evt] = remaining;
      } else {
        delete this._events[evt];
      }
    }
    
    return this;
  }
  

  /**
   * Trigger one or many events, firing all bound callbacks. Callbacks are
   * passed the same arguments as `trigger` is, apart from the event name
   * (unless you're listening on `"all"`, which will cause your callback to
   * receive the true name of the event as the first argument).
   * @param {string} name of event to trigger
   * @returns {EventEmitter} instance of EventEmitter
   */
  static trigger(name) {
    if (!this._events) {
      return this;
    }
    
    const args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) {
      return this;
    }
    
    const events = this._events[name];
    const allEvents = this._events.all;
    if (events) {
      triggerEvents(events, args);
    }
    
    if (allEvents) {
      triggerEvents(allEvents, arguments);
    }
    
    return this;
  }
  
  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  static stopListening(objArg, name, callbackArg) {
    let obj = objArg;
    let callback = callbackArg;
    let listeningTo = this._listeningTo;
    if (!listeningTo) {
      return this;
    }
    
    const remove = !name && !callback;
    if (!callback && name !== null && typeof name === 'object') {
      callback = this;
    }
    
    if (obj) {
      (listeningTo = {})[obj._listenId] = obj;
    }
    
    for (const id in listeningTo) {
      if (listeningTo.hasOwnProperty(id)) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) {
          delete this._listeningTo[id];
        }
      }
    }
    
    return this;
  }
  
  static emit() {
    return this.trigger.apply(this, arguments);
  }
  
}

const listenMethods = { listenTo: 'on', listenToOnce: 'once' };

// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
_.each(listenMethods, function (implementation, method) {
  EventEmitter.prototype[method] = function (obj, name, callbackArg) {
    let callback = callbackArg;
    const listeningTo = this._listeningTo || (this._listeningTo = {});
    const id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    listeningTo[id] = obj;
    if (!callback && name !== null && typeof name === 'object') {
      callback = this;
    }
    
    obj[implementation](name, callback, this);
    return this;
  };
  
  EventEmitter[method] = function (obj, name, callbackArg) {
    let callback = callbackArg;
    const listeningTo = this._listeningTo || (this._listeningTo = {});
    const id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    listeningTo[id] = obj;
    if (!callback && name !== null && typeof name === 'object') {
      callback = this;
    }
    
    obj[implementation](name, callback, this);
    return this;
  };
});

