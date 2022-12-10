const M = require("minimatch")

class InhaltAndAnswer {

    constructor() {

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



    }
    /**
       * This function returns the variable inhalt: The answer to be reached to the user
       * And it sets the variables for the replies of the user. For example it sets variables such as coffeeTemperature, grainType, etc
    */
    retrieveInhaltAndSetAnswerVariables(databank, message) {
        switch (this.currentQuestionNumber) {
            case 0: //First question, grain type and greetings
                this.firstQuestionAnswer(databank, message)
                break

            case 1: //Second question, temperature
                this.secondQuestionAnswer(databank, message)
                break

            case 2: //Third question, coffee type
                this.thirdQuestionAnswer(databank, message)
                break

            case 3: //Fourth question, sugar
                this.fourthQuestionAnswer(databank, message)
                break

        }

        return this.inhalt
    }

    firstQuestionAnswer(databank, message) {
        this.inhalt = databank.falseAnswerGrainType[this.falseAnswers].answer
        if (this.falseAnswers < databank.falseAnswerGrainType.length - 1) {
            this.falseAnswers++
        } else {
            this.falseAnswers = 0
        }

        //greetings
        for (var j = 0; j < databank.greetings.length; j++) {
            if (message.includes(databank.greetings[j].intent)) {
                this.inhalt = databank.greetings[j].answer
            }
        }
        //grain type
        for (var j = 0; j < databank.grain.length; j++) {
            if (message.includes(databank.grain[j].intent)) {
                this.inhalt = databank.grain[j].answer
                this.grainType = databank.grain[j].intent
                this.currentQuestionNumber += 1
            }
        }

    }

    secondQuestionAnswer(databank, message) {
        this.determineFalseAnswerToSecondQuestion(databank)
        for (var j = 0; j < databank.temperature.length; j++) {
            if (message.includes(databank.temperature[j].intent)) {
                this.inhalt = databank.temperature[j].answer
                this.coffeeTemperature = databank.temperature[j].intent
                this.currentQuestionNumber++
            }
        }
    }

    determineFalseAnswerToSecondQuestion(databank) {
        if (this.falseAnswers < databank.falseAnswerSecondQuestion.length - 1) {
            this.falseAnswers++
        } else {
            this.falseAnswers = 0
        }
        this.inhalt = databank.falseAnswerSecondQuestion[this.falseAnswers].answer
        this.inhalt = this.inhalt.replace("{{graintype}}", this.grainType)
    }



    thirdQuestionAnswer(databank, message) {
        this.determineFalseAnswerToThirdQuestion(databank)
        //Hot coffee
        if (this.coffeeTemperature === "hot") {
            for (var j = 0; j < databank.hotCoffee.length; j++) {
                if (message.includes(databank.hotCoffee[j].intent)) {
                    this.inhalt = databank.hotCoffee[j].answer
                    this.coffeeType = databank.hotCoffee[j].intent
                    this.currentQuestionNumber++
                }
            }
            //Cold coffee
        } else if (this.coffeeTemperature === "cold") {
            for (var j = 0; j < databank.coldCoffee.length; j++) {
                if (message.includes(databank.coldCoffee[j].intent)) {
                    this.inhalt = databank.coldCoffee[j].answer
                    this.coffeeType = databank.coldCoffee[j].intent
                    this.currentQuestionNumber++
                }
            }
        }
    }

    determineFalseAnswerToThirdQuestion(databank) {
        if (this.falseAnswers < databank.falseAnswerThirdQuestion.length - 1) {
            this.falseAnswers++
        } else {
            this.falseAnswers = 0
        }
        this.inhalt = databank.falseAnswerThirdQuestion[this.falseAnswers].answer
        this.inhalt = this.inhalt.replace("{{graintype}}", this.grainType)
        this.inhalt = this.inhalt.replace("{{coffeeTemperature}}", this.coffeeTemperature)
    }

    fourthQuestionAnswer(databank, message) {
        this.determineFalseAnswerToFourthQuestion(databank)
        for (var j = 0; j < databank.yes.length; j++) {
            if (message.includes(databank.yes[j].intent)) {
                this.sugar = true
                this.inhalt = 'So you chose the ' + this.grainType + ' grain type, wanted a ' + this.coffeeTemperature + ' coffee and chose the coffee type ' + this.coffeeType + ". You also wanted sugar in your coffee. You are now all set to order your next coffee or even make your own!!!<br><br>You can now make another coffee ☕. Arabica or Robusta?<br><a id='coffee_difference' onclick='coffeeGrainDiffference()'><i>What is the difference between Arabica and Robusta?</i></a>"
                this.currentQuestionNumber = 0
            }
        }

        for (var j = 0; j < databank.no.length; j++) {
            if (message.includes(databank.no[j].intent)) {
                this.sugar = false
                this.inhalt = 'So you chose the ' + this.grainType + ' grain type, wanted a ' + this.coffeeTemperature + ' coffee and chose the coffee type ' + this.coffeeType + ". However you did not want sugar. You are now all set to order your next coffee or even make your own!!!<br><br>You can now make another coffee ☕. Arabica or Robusta?<br><a id='coffee_difference' onclick='coffeeGrainDiffference()'><i>What is the difference between Arabica and Robusta?</i></a>"
                this.currentQuestionNumber = 0
            }
        }
    }

    determineFalseAnswerToFourthQuestion(databank) {
        if (this.falseAnswers < databank.falseAnswerFourthQuestion.length - 1) {
            this.falseAnswers++
        } else {
            this.falseAnswers = 0
        }
        this.inhalt = databank.falseAnswerFourthQuestion[this.falseAnswers].answer
        this.inhalt = this.inhalt.replace("{{graintype}}", this.grainType)
        this.inhalt = this.inhalt.replace("{{coffeeTemperature}}", this.coffeeTemperature)
        this.inhalt = this.inhalt.replace("{{coffeetype}}", this.coffeeType)
    }



}

module.exports = InhaltAndAnswer