const axios = require("axios");
const serverConfig = require("../src/config");
const BACKEND = process.env.BACKEND_URL;

describe("Testing Airplane Service & Controllers", () => {
  let airplanesCreated = [];

  afterEach(async () => {
    for (const id of airplanesCreated) {
      try {
        await axios.delete(`${BACKEND}/api/v1/airplanes/${id}`);
      } catch (error) {}
    }
    airplanesCreated = [];
  });

  test("should return all airplanes", async () => {
    const response = await axios.get(`${BACKEND}/api/v1/airplanes`);
    const airplanes = response.data.data;
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty("success", true);

    airplanes.forEach((airplane) => {
      expect(airplane).toHaveProperty("modelNumber");
      expect(airplane).toHaveProperty("capacity");
    });
  });

  test("let organisation create flights with correct metadata", async () => {
    const payload = { modelNumber: "Boeing Dreamliner", capacity: 220 };
    const response = await axios.post(`${BACKEND}/api/v1/airplanes`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("success", true);
    expect(response.data.data).toHaveProperty("modelNumber");
    expect(response.data.data).toHaveProperty("capacity");

    airplanesCreated.push(response.data.data.id);
  });

  test("should return error if organisation tries to create airplane without modelNumber", async () => {
    const payload = { capacity: 220 };
    try {
      const response = await axios.post(`${BACKEND}/api/v1/airplanes`, payload);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty("success", false);
      expect(error.response.data).toHaveProperty("error");
    }
  });

  test("should return error if organisation tries to create airplane without capacity", async () => {
    const payload = { modelNumber: "Airbus A340 Neo" };
    try {
      const response = await axios.post(`${BACKEND}/api/v1/airplanes`, payload);
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty("success", false);
      expect(error.response.data).toHaveProperty("error");
    }
  });

  test("should return airplane with given id and if it does not exist should return 404 error", async () => {
    try {
      const response = await axios.get(`${BACKEND}/api/v1/airplanes/1`);
      expect(response.status).toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("let organisation delete any airplane & if it does not exist then throw a 404 error", async () => {
    try {
      const response = await axios.delete(`${BACKEND}/api/v1/airplanes/24`);
      expect(response.status).toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe("Testing Airport Service & Controller", () => {
  let createdAirports = [];

  afterEach(async () => {
    for (const id of createdAirports) {
      try {
        const response = await axios.delete(`${BACKEND}/api/v1/airports/${id}`);
      } catch (error) {}
    }

    createdAirports = [];
  });

  test("should return all airports", async () => {
    const response = await axios.get(`${BACKEND}/api/v1/airports`);
    expect(response.status).toBe(200);

    const airportData = response.data.data;
    airportData.forEach((a) => {
      expect(a).toHaveProperty("name");
      expect(a).toHaveProperty("code");
      expect(a).toHaveProperty("cityId");
    });
  });

  test("should allow organisation to create airports", async () => {
    const payload = { name: "NYC International Airport", code: "NYC", address: "JFK Street", cityId: 13 };
    const response = await axios.post(`${BACKEND}/api/v1/airports`, payload);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty("success", true);
    expect(response.data.data).toHaveProperty("name");
    expect(response.data.data).toHaveProperty("code");
    expect(response.data.data).toHaveProperty("cityId");
    expect(response.data.data).toHaveProperty("address");

    createdAirports.push(response.data.data.id);
  });

  test("should return error if organisation tries to create airport without all details", async () => {
    const errorPayload = [
      { name: "London Airport", code: "LHR" },
      { code: "DXB", cityId: 13 },
      { name: "London Airport", cityId: 15 },
    ];

    for (const payload of errorPayload) {
      try {
        await axios.post(`${BACKEND}/api/v1/airports`, payload);
      } catch (error) {
        expect(error.response.status).toBe(400);
        expect(error.response.data).toHaveProperty("success", false);
      }
    }
  });

  test("should return airport with given id and if there is no info related to airport should give 404 error", async () => {
    try {
      const response = await axios.get(`${BACKEND}/api/v1/airports/5`);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("success", true);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty("success", false);
    }
  });

  test("should allow organisation to delete airport and if there is no info should give 404 error", async () => {
    try {
      const response = await axios.delete(`${BACKEND}/api/v1/airports/10`);
      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty("success", true);
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toHaveProperty("success", false);
    }
  })
});
