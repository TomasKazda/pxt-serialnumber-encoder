//% color="#2a9d8f" icon="\uf162" block="Utility" blockId="UtilityPslib"
namespace Utility {
    /*
    export enum Enum {
        //% block="comment"
        M1 = 0x3,
    }
    */

    /**
     * Get encoded serial number
    */
    //% blockId=encode_serial block="Get encoded serial number"
    export function encodeSerial(serialNumber?: number): string {
        const ofset = 48;
        let serialNo = serialNumber === undefined ? control.deviceSerialNumber() : serialNumber;
        if (serialNumber < 0) {
            serialNumber -= 1;
            console.log(serialNumber)
            serialNumber = (Math.pow(2, 32)-1)^serialNumber;
            console.log(serialNumber)
        }
        let output = "";
        for (let i = 0; serialNo > 0; i++) {
            let fraction = serialNo % Math.pow(64, i+1);
            serialNo -= fraction;
            output = String.fromCharCode(fraction / Math.pow(64, i) + ofset) + output;
        }
        return String.fromCharCode(ofset) + output
    }
}