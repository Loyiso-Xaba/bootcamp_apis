import assert from "assert";
import { enoughAirtime } from "../totalphonebill.js";

describe('Enough airtime test', function () {
    it('should check if the user will have sufficient airtime based on the call/sms actions they take', function () {
        assert.equal('R15.50', enoughAirtime('call, call, sms, data' , 30));
        assert.equal('R1.50', enoughAirtime('data, data, data, data, call, call, call, call, sms, data', 60));
        assert.equal('R0.00', enoughAirtime('data', 10));
    
});
});


