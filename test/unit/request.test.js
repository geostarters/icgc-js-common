
require("flow-remove-types/register");
const test = require("tap").test;
const Request = require("../../src/request");

test("Request", (t) => {

	t.test("#processResponse", async (t) => {

		const goesWell = new Promise((resolve, reject) => {

			Request.processResponse({status: 200, data: { ok: true} }, resolve, reject);

		});
		const goesBad1 = new Promise((resolve, reject) => {

			Request.processResponse({status: 302}, resolve, reject);

		});
		const goesBad2 = new Promise((resolve, reject) => {

			Request.processResponse({status: 200, data: { ok: false, message: "Not ok"} }, resolve, reject);

		});

		await t.resolves(goesWell, "Response not ok");
		await t.rejects(goesBad1, "Response ok");
		await t.rejects(goesBad2, "Response ok");

		t.end();

	});

	t.test("#processError", async (t) => {

		const doesReject = new Promise((resolve, reject) => {

			Request.processError({message: "Rejects"}, reject);

		});

		await t.rejects(doesReject, "rejects ok");

		t.end();

	});

	t.test("#get", async (t) => {

		await t.resolves(Request.get("http://www.google.com"));
		await t.rejects(Request.get("http://www.x.cat"));

		t.end();

	});

	t.end();

});
