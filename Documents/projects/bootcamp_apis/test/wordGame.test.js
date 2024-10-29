import assert from "assert";
import { longestWord, shortestWord, wordLengths } from "../wordGame.js";

describe('The wordGame test', function () {

    it('must detect the shortest, longest and overall length of words in a given sentence', function () {
        assert.equal('saturday', longestWord('A new movie is coming out this saturday'), "longestWord function not operating");
        assert.equal('weekend', longestWord('Do you want to go see a movie this weekend'), "longestWord failing...");

        assert.equal('a', shortestWord('Are we sure today is a holiday?'), "shortestWord function not operating");
        assert.equal('a', shortestWord('Today is a holiday but it doesnt feel like one'), "shortestWord function not operating");

        assert.equal(7, wordLengths('Who posted a tweet on my account'), "wordLengths function not operating");
        assert.equal(6, wordLengths('Please tell me who tweeted that'), "wordLengths function not operating");
    });
});