
'use strict';

class stateForecaster {
  constructor(groupNode) {
    this.statelistNode = groupNode;

    this.states = [];

    this.demTotal = document.getElementById('demsTotal')
    this.gopTotal = document.getElementById('gopTotal')

    this.liveAnnouncer = document.getElementById('liveAnnouncer');

    this.states = Array.from(this.statelistNode.querySelectorAll('g[role=button]'));
    this.firstState = null;
    this.lastState = null;

    console.log(this.states)
    for (var i = 0; i < this.states.length; i += 1) {
      var state = this.states[i];

      state.tabIndex = -1;
      state.setAttribute('data-selected', 'false');

      state.addEventListener('keydown', this.onKeydown.bind(this));
      state.addEventListener('click', this.onClick.bind(this));

      if (!this.firstState) {
        this.firstState = state;
      }
      this.lastState = state;
    }

    this.setSelectedState(this.firstState);
  }

  setSelectedState(currentState) {
    for (var i = 0; i < this.states.length; i += 1) {
      var state = this.states[i];
      if (currentState === state) {
        state.setAttribute('data-selected', 'true');
        state.tabIndex = 0;
      } else {
        state.setAttribute('data-selected', 'false');
        state.tabIndex = -1;
      }
    }
  }

  moveFocusToState(currentState) {
    currentState.focus();
  }

  moveFocusToPreviousState(currentState) {
    var index;

    if (currentState === this.firstState) {
      this.moveFocusToState(this.lastState);
    } else {
      index = this.states.indexOf(currentState);
      this.moveFocusToState(this.states[index - 1]);
    }
  }

  changeStateForecast(currentState) {
    var currentForecast = currentState.classList[0];
    var currentAccessibleName = currentState.getAttribute('aria-label');
    var newForecast;
    var newAccessibleName;

    if(currentForecast == 'gop') {
        newForecast = 'dem';
        newAccessibleName = currentAccessibleName.replace('Selected as Republican win.', 'Selected as Democratic win.')
        currentState.setAttribute('aria-label', newAccessibleName);
        currentState.classList.remove(currentForecast);
        currentState.classList.add(newForecast);
        currentState.setAttribute('data-party', 'Democratic');
        this.gopTotal.textContent = parseInt(this.gopTotal.textContent) - 1;
        this.demTotal.textContent = parseInt(this.demTotal.textContent) + 1;
    } else if (currentForecast == 'tossup'){ 
        newForecast = 'dem';
        newAccessibleName = currentAccessibleName.replace('Unselected. Too close to call.', 'Selected as Democratic win.')
        currentState.setAttribute('aria-label', newAccessibleName);
        currentState.classList.remove(currentForecast);
        currentState.classList.add(newForecast);
        currentState.setAttribute('data-party', 'Democratic');
        this.demTotal.textContent = parseInt(this.demTotal.textContent) + 1;
    } else {
        newForecast = 'gop';
        newAccessibleName = currentAccessibleName.replace('Selected as Democratic win.', 'Selected as Republican win.')
        currentState.setAttribute('aria-label', newAccessibleName);
        currentState.classList.remove(currentForecast);
        currentState.classList.add(newForecast);
        currentState.setAttribute('data-party', 'Republican');
        this.gopTotal.textContent = parseInt(this.gopTotal.textContent) + 1;
        this.demTotal.textContent = parseInt(this.demTotal.textContent) - 1;
    }
    
    this.makeLiveAnnouncement(currentState)
  }

  makeLiveAnnouncement(currentState) {    
    var stateName = currentState.getAttribute('data-id');
    var stateParty = currentState.getAttribute('data-party');

    // Summarize the change in page content.
    var liveMessage = stateName + " " + "selected as a " + stateParty + " " + "win. " + "Updated U.S. Senate breakdown: " + this.demTotal.textContent + " Democratic seats " + this.gopTotal.textContent + " Republican seats."
  
    this.liveAnnouncer.textContent = liveMessage;
}

  moveFocusToNextState(currentState) {
    var index;

    if (currentState === this.lastState) {
      this.moveFocusToState(this.firstState);
    } else {
      index = this.states.indexOf(currentState);
      this.moveFocusToState(this.states[index + 1]);
    }
  }


  /* EVENT HANDLERS */

  onKeydown(event) {
    var tgt = event.currentTarget,
      flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.moveFocusToPreviousState(tgt);
        flag = true;
        break;

      case 'ArrowRight':
        this.moveFocusToNextState(tgt);
        flag = true;
        break;

      case 'ArrowUp':
        this.moveFocusToPreviousState(tgt);
        flag = true;
        break;

      case 'ArrowDown':
        this.moveFocusToNextState(tgt);
        flag = true;
        break;

      case 'Enter':
        this.changeStateForecast(tgt)
        flag = true;
        break;

      case ' ':
        this.changeStateForecast(tgt)
        flag = true;
        break;
    
      // when user moves focus from the bee-swarm. clear the live region so that the screen reader user does not encounter the live announcement text
      case 'Tab':
        this.liveAnnouncer.textContent = '';

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  // Since this example uses buttons for the states, the click onr also is activated
  // with the space and enter keys
  onClick(event) {
    this.changeStateForecast(event.currentTarget);
  }
}

// Initialize statelist

window.addEventListener('load', function () {
    console.log('hello')
  var statelists = document.querySelectorAll('[data-role=state-list]');
  for (var i = 0; i < statelists.length; i++) {
    new stateForecaster(statelists[i]);
  }

  document.getElementById('toggle').addEventListener('change', (event) => {
    if(event.target.checked) {
        document.getElementById('liveAnnouncer').classList.remove('visuallyhidden')
    } else {
        document.getElementById('liveAnnouncer').classList.add('visuallyhidden')
    }
  })

});
