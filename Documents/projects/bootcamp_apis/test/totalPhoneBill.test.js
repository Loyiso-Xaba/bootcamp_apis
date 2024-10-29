import assert from "assert";
import { totalPhoneBill } from "../totalphonebill.js";

describe('The totalPhoneBill test', function () {

    it('fucntion should calculate bill for a given action string', function () {
        assert.equal('R5.50', totalPhoneBill('call, sms, call, sms, sms'));
        assert.equal('R2.50', totalPhoneBill('call, sms'));
        assert.equal('R1.00', totalPhoneBill('sms, sms'));
    });
});