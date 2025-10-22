const axios = require("axios");
const serverConfig = require("../src/config");
const BACKEND = process.env.BACKEND_URL;

describe("Testing Airplane Service & Controllers", () => {
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

  test("should return airplane with given id", async () => {
    const response = await axios.get(`${BACKEND}/api/v1/airplanes/1`);
    expect(response.status).toBe(200);
  });

  test("should return error if user tries to find airplane that does not exist", async () => {
    try {
      const response = await axios.get(`${BACKEND}/api/v1/airplanes/1b`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test("let organisation delete any airplane & if it does not exist then throw a 404 error", async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/v1/airplanes/17");
      expect(response.status).toBe(200);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
