"use strict";
import { ABOUT_TEXT, EXP_TEXT, SKILLS_TEXT, LINKS_TEXT } from "./dialogTexts.js";

const dialogue = document.getElementById('dialogueText');
const dialogueBox = document.getElementById('dialogueBox');
const blinker = document.getElementById('blinker');
const tab2D = [ABOUT_TEXT, EXP_TEXT, SKILLS_TEXT, LINKS_TEXT]

var cursor = 0; // current offset in msg
var timer = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function resetCursorAndTimeOut() {
  clearTimeout(timer);
  cursor = 0;
  timer = 0;
}

{
  var idx = 0;
  var currOptChoice = -1;

  function routeAction(optChoice, newDialog) {
    if (newDialog) {
      blinker.style.visibility = "hidden";
      idx = 0;
      currOptChoice = optChoice;
    }

    // if no current choice or index out of bound
    if (idx > (tab2D[optChoice].length - 1)) {
      return;
    }

    // if last tab print all links
    if (optChoice == 3) {
      outputLinks(tab2D[optChoice]);
      return;
    }

    // reset timeout on new routeAction
    resetCursorAndTimeOut();
    outputMessage(tab2D[optChoice][idx]);
  }

  function continueCurrentDialogue() {
    // hide blinker
    blinker.style.visibility = "hidden";
    idx++;
    routeAction(currOptChoice, false);
  }

  function outputLinks(links) {
    resetCursorAndTimeOut();
    dialogue.textContent = "";

    links.forEach(function (e) {
      var a = document.createElement("a");
      a.href = e[1];
      a.appendChild(document.createTextNode(e[0]));
      dialogue.appendChild(a);
      dialogue.appendChild(document.createElement("br"));
    });
  }

  function outputMessage(msg) {
    if (!msg || (cursor > msg.length)) {
      resetCursorAndTimeOut();
      // show blinker
      if (idx != (tab2D[currOptChoice].length - 1)) blinker.style.visibility = "visible";
      return;
    }

    dialogue.textContent = msg.substr(0, cursor++);
    timer = window.setTimeout(function () {
      outputMessage(msg);
    }, 20);
  }

  document.getElementById("btnAbout").addEventListener("click", function() {
    routeAction(0, true);
  }, false);
  document.getElementById("btnExperience").addEventListener("click", function() {
    routeAction(1, true);
  }, false);
  document.getElementById("btnSkills").addEventListener("click", function() {
    routeAction(2, true);
  }, false);
  document.getElementById("btnLinks").addEventListener("click", function() {
    routeAction(3, true);
  }, false);

  // how to wait until outputMessage finishes to enable?
  dialogueBox.addEventListener("click", function(){
    continueCurrentDialogue();
  }, false);

}

