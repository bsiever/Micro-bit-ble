// Based on "Environment data logger", © Micro:bit Educational Foundation
// https://microbit.org/projects/make-it-code-it/environment-data-logger/
// CC BY-SA 4.0 license: https://creativecommons.org/licenses/by-sa/4.0/
// Note: License unfit for software; further adaptation not recommended.
// 2023-09-11 Changed icons and button behavior; added 'pxt-blelog'.
datalogger.onLogFull(function () {
    looping = false
    basic.showString("B")
})
input.onButtonPressed(Button.A, function () {
    if (looping) {
        looping = false
        basic.showLeds(`
            . . . . .
            . # . # .
            . # . # .
            . # . # .
            . . . . .
            `)
    } else {
        looping = true
        basic.showLeds(`
            . # . . .
            . # # . .
            . # # # .
            . # # . .
            . # . . .
            `)
    }
})
input.onButtonPressed(Button.B, function () {
    if (looping) {
        basic.showIcon(IconNames.No)
    } else {
        basic.showIcon(IconNames.Yes)
        datalogger.deleteLog()
        datalogger.setColumnTitles(
            "temperature (°C)",
            "light level"
        )
    }
})
let looping = false
blelog.startBLELogService()
looping = false
basic.showString("A")
datalogger.setColumnTitles(
    "temperature (°C)",
    "light level"
)
loops.everyInterval(1000, function () {
    if (looping) {
        basic.showString("A")
        datalogger.log(
            datalogger.createCV("temperature (°C)", input.temperature()),
            datalogger.createCV("light level", input.lightLevel())
        )
        basic.clearScreen()
    }
})
