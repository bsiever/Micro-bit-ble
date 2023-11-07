// Based on "Environment data logger", © Micro:bit Educational Foundation
// https://microbit.org/projects/make-it-code-it/environment-data-logger/
// CC BY-SA 4.0 license: https://creativecommons.org/licenses/by-sa/4.0/
// Note: License unfit for software; further adaptation not recommended.
// 2023-09-11 Changed icons and button behavior; added 'pxt-blelog'.
// 2023-11-03 Removed pause button; added infrequent (manual) input.
datalogger.onLogFull(function () {
    looping = false
    basic.showString("B")
})
input.onButtonPressed(Button.A, function () {
    if (looping) {
        datalogger.log(
            datalogger.createCV("last press (seconds)", elapsed)
        )
        elapsed = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (looping) {
        looping = false
    }
    datalogger.deleteLog()
})
let elapsed = 0
let looping = true
blelog.startBLELogService()
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
        elapsed += 1
        basic.clearScreen()
    }
})
