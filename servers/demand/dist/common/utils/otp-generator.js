"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const otp_generator_1 = require("otp-generator");
class OTPGenerator {
    constructor(options, length = 6) {
        this.length = length !== null && length !== void 0 ? length : 6;
        this.options = options !== null && options !== void 0 ? options : {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        };
    }
    generate() {
        return (0, otp_generator_1.generate)(this.length, this.options);
    }
}
exports.default = OTPGenerator;
