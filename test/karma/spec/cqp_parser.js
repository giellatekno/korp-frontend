/* eslint-disable
    no-undef,
*/
require("../../../app/scripts/cqp_parser/CQPParser.js")
require("../../../app/scripts/cqp_parser/cqp.js")
window.moment = require("moment")

describe("parsing", function() {
    it("can parse simple expr", () =>
        expect(JSON.stringify(CQP.parse("[word = 'foo']")))
            .toEqual('[{"and_block":[[{"type":"word","op":"=","val":"foo","flags":null}]]}]')
    )
    
    it("can parse struct attr", () =>
        expect(JSON.stringify(CQP.parse("[_.text_type = 'bar']")))
            .toEqual('[{"and_block":[[{"type":"_.text_type","op":"=","val":"bar","flags":null}]]}]')
    )


    it("can parse a sequence", () =>
        expect(JSON.stringify(CQP.parse("[word = 'foo'] [word = 'bar']")))
            .toEqual('[{"and_block":[[{"type":"word","op":"=","val":"foo","flags":null}]]},{"and_block":[[{"type":"word","op":"=","val":"bar","flags":null}]]}]')
    )
})

const basicExpressions = [
    "[word = \"foo\"]",
    "[word = \"foo\"] [word = \"bar\"] [word = \"what\"]",
    "[word = \"foo\"] []{1,3} [word = \"what\"]",
    "[(word = \"foo\" | pos = \"NN\")]",
    "[$date_interval = '20130610,20130617,114657,111014']",
    "[]",
    "[]{5,7}",
    "[pos = \"PM\" & lex contains \"katt..nn.1\"]",
    "[word = \"\\\"\"]"
  ]

const changingExpressions = [
    { input: "[word = \"foo\" | pos = \"NN\"]", expected: "[(word = \"foo\" | pos = \"NN\")]" },
    { input: "[word = 'foo']", expected: "[word = \"foo\"]" },
    { input: "[word = '\"']", expected: "[word = \"\\\"\"]" }
]

const expandExpressions = [
    {
        input: "[$date_interval = \"20130610,20130617,114657,111014\"]", 
        expected: "[((int(_.text_datefrom) = 20130610 & int(_.text_timefrom) >= 114657) | (int(_.text_datefrom) > 20130610 & int(_.text_datefrom) <= 20130617)) & (int(_.text_dateto) < 20130617 | (int(_.text_dateto) = 20130617 & int(_.text_timeto) <= 111014))]"
    }
]

describe("parsing", function() {
    it("can parse simple expr", () =>
        basicExpressions.map((expr) =>
            expect(CQP.stringify(CQP.parse(expr))).toEqual(expr))
    )

    it("changes", () =>
        changingExpressions.map((expr) =>
            expect(CQP.stringify(CQP.parse(expr.input))).toEqual(expr.expected))
    )

    it("expands", () =>
        expandExpressions.map((expr) =>
            expect(CQP.stringify(CQP.parse(expr.input), true)).toEqual(expr.expected))
    )
})
