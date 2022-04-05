const extensionBlocks = [
  "pen_menu_colorParam",
  "pen_clear",
  "pen_stamp",
  "pen_penDown",
  "pen_penUp",
  "pen_setPenColorToColor",
  "pen_changePenColorParamBy",
  "pen_setPenColorParamTo",
  "pen_changePenSizeBy",
  "pen_setPenSizeTo",
  "pen_setPenShadeToNumber",
  "pen_changePenShadeBy",
  "pen_setPenHueToNumber",
  "pen_changePenHueBy",
  "music_menu_DRUM",
  "music_menu_INSTRUMENT",
  "music_playDrumForBeats",
  "music_midiPlayDrumForBeats",
  "music_restForBeats",
  "music_playNoteForBeats",
  "music_setInstrument",
  "music_midiSetInstrument",
  "music_setTempo",
  "music_changeTempo",
  "music_getTempo",
  "videoSensing_menu_ATTRIBUTE",
  "videoSensing_menu_SUBJECT",
  "videoSensing_menu_VIDEO_STATE",
  "videoSensing_whenMotionGreaterThan",
  "videoSensing_videoOn",
  "videoSensing_videoToggle",
  "videoSensing_setVideoTransparency",
  "text2speech_menu_voices",
  "text2speech_menu_languages",
  "text2speech_speakAndWait",
  "text2speech_setVoice",
  "text2speech_setLanguage",
  "translate_menu_languages",
  "translate_getTranslate",
  "translate_getViewerLanguage",
  "makeymakey_menu_KEY",
  "makeymakey_menu_SEQUENCE",
  "makeymakey_whenMakeyKeyPressed",
  "makeymakey_whenCodePressed",
  "microbit_menu_buttons",
  "microbit_menu_gestures",
  "microbit_menu_pinState",
  "microbit_menu_tiltDirection",
  "microbit_menu_tiltDirectionAny",
  "microbit_menu_touchPins",
  "microbit_whenButtonPressed",
  "microbit_isButtonPressed",
  "microbit_whenGesture",
  "microbit_displaySymbol",
  "microbit_displayText",
  "microbit_displayClear",
  "microbit_whenTilted",
  "microbit_isTilted",
  "microbit_getTiltAngle",
  "microbit_whenPinConnected",
  "ev3_menu_motorPorts",
  "ev3_menu_sensorPorts",
  "ev3_motorTurnClockwise",
  "ev3_motorTurnCounterClockwise",
  "ev3_motorSetPower",
  "ev3_getMotorPosition",
  "ev3_whenButtonPressed",
  "ev3_whenDistanceLessThan",
  "ev3_whenBrightnessLessThan",
  "ev3_buttonPressed",
  "ev3_getDistance",
  "ev3_getBrightness",
  "ev3_beep",
  "boost_menu_MOTOR_ID",
  "boost_menu_MOTOR_REPORTER_ID",
  "boost_menu_MOTOR_DIRECTION",
  "boost_menu_TILT_DIRECTION",
  "boost_menu_TILT_DIRECTION_ANY",
  "boost_menu_COLOR",
  "boost_motorOnFor",
  "boost_motorOnForRotation",
  "boost_motorOn",
  "boost_motorOff",
  "boost_setMotorPower",
  "boost_setMotorDirection",
  "boost_getMotorPosition",
  "boost_whenColor",
  "boost_seeingColor",
  "boost_whenTilted",
  "boost_getTiltAngle",
  "boost_setLightHue",
  "wedo2_menu_MOTOR_ID",
  "wedo2_menu_MOTOR_DIRECTION",
  "wedo2_menu_TILT_DIRECTION",
  "wedo2_menu_TILT_DIRECTION_ANY",
  "wedo2_menu_OP",
  "wedo2_motorOnFor",
  "wedo2_motorOn",
  "wedo2_motorOff",
  "wedo2_startMotorPower",
  "wedo2_setMotorDirection",
  "wedo2_setLightHue",
  "wedo2_playNoteFor",
  "wedo2_whenDistance",
  "wedo2_whenTilted",
  "wedo2_getDistance",
  "wedo2_isTilted",
  "wedo2_getTiltAngle",
  "gdxfor_menu_pushPullOptions",
  "gdxfor_menu_gestureOptions",
  "gdxfor_menu_axisOptions",
  "gdxfor_menu_tiltOptions",
  "gdxfor_menu_tiltAnyOptions",
  "gdxfor_whenGesture",
  "gdxfor_whenForcePushedOrPulled",
  "gdxfor_getForce",
  "gdxfor_whenTilted",
  "gdxfor_isTilted",
  "gdxfor_getTilt",
  "gdxfor_isFreeFalling",
  "gdxfor_getSpinSpeed",
  "gdxfor_getAcceleration"
] as const;

type ExtensionBlock = typeof extensionBlocks[number];

export default ExtensionBlock;