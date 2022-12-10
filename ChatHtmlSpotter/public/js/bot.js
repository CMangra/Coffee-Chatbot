'use strict'

const M = require('minimatch')

var WebSocketClient = require('websocket').client
var inhaltAndAnswers = require('./inhaltAndAnswers')

/**
 * bot ist ein einfacher Websocket Chat Client
 */

class bot {

  /**
   * Konstruktor baut den client auf. Er erstellt einen Websocket und verbindet sich zum Server
   * Bitte beachten Sie, dass die Server IP hardcodiert ist. Sie müssen sie umsetzten
   */
  constructor() {


    /** Die Websocketverbindung
      */
    this.client = new WebSocketClient()
    /**
     * This is an object which gets the answer to be returned to the user.
     */
    this.myInhaltAndAnswers = new inhaltAndAnswers()
    /**
     * Wenn der Websocket verbunden ist, dann setzten wir ihn auf true
     */
    this.connected = false
    /**
     * This is the actual number of questions replied by the users.
     */
    this.currentQuestionNumber = 0
    /**
     * This is the number of false answers given by the user.
     */
    this.falseAnswers = 0
    /**
     * This is the grain type chosen by the user.
     */
    this.grainType = ""
    /**
     * This is the coffee temperature chosen by the user.
     */
    this.coffeeTemperature = ""
    /**
     * This is the coffe type chosen by the user.
     */
    this.coffeeType = ""
    /**
     * This is a default boolean set to false. This variable is turned to true if the user choses to add sugar to his drink.
     * This is a default boolean set to false. This variable is turned to true if the user choses to add sugar to his drink.
     */
    this.sugar = false

    /**
     * Wenn die Verbindung nicht zustande kommt, dann läuft der Aufruf hier hinein
     */
    this.client.on('connectFailed', function (error) {
      console.log('Connect Error: ' + error.toString())
    })

    /** 
     * Wenn der Client sich mit dem Server verbindet sind wir hier 
    */
    this.client.on('connect', function (connection) {
      this.con = connection
      console.log('WebSocket Client Connected')
      connection.on('error', function (error) {
        console.log('Connection Error: ' + error.toString())
      })

      /** 
       * Es kann immer sein, dass sich der Client disconnected 
       * (typischer Weise, wenn der Server nicht mehr da ist)
      */
      connection.on('close', function () {
        console.log('echo-protocol Connection Closed')
      })

      /** 
       *    Hier ist der Kern, wenn immmer eine Nachricht empfangen wird, kommt hier die 
       *    Nachricht an. 
      */
      connection.on('message', function (message) {
        if (message.type === 'utf8') {
          var data = JSON.parse(message.utf8Data)
          console.log('Received: ' + data.msg + ' ' + data.name)
        }
      })

      /** 
       * Hier senden wir unsere Kennung damit der Server uns erkennt.
       * Wir formatieren die Kennung als JSON
      */
      function joinGesp() {
        if (connection.connected) {
          connection.sendUTF('{"type": "join", "name":"MegaBot"}')
        }
      }
      joinGesp()
    })
  }

  /**
   * Methode um sich mit dem Server zu verbinden. Achtung wir nutzen localhost
   * 
   */
  connect() {
    this.client.connect('ws://localhost:8181/', 'chat')
    this.connected = true
  }

  /** 
   * Diese Funktion wird automatisch im Server aufgerufen, wenn etwas ankommt, das wir 
   * nicht geschrieben haben
   * @param message auf die der bot reagieren soll
  */
  post(message) {
    message = message.toLowerCase()
    var name = 'MegaBot'

    let databank = require('../../public/json/databank.json')
    var inhalt = this.myInhaltAndAnswers.retrieveInhaltAndSetAnswerVariables(databank, message)

    var msg = '{"type": "msg", "name": "' + name + '", "msg":"' + inhalt + '"}'
    console.log('Send: ' + msg)
    this.client.con.sendUTF(msg)
  }









}

module.exports = bot
