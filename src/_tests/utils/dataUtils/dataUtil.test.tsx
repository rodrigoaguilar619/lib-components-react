import { deepClone } from "@app/utils/dataUtils/dataUtil";

describe("deepClone", () => {
  it("should perform a deep clone of the input object", () => {
    // Prepare test data
    const originalObj = { a: 1, b: { c: 2 } };

    // Execute the function
    const clonedObj = deepClone(originalObj);

    // Modify the cloned object to ensure deep cloning
    clonedObj.b.c = 3;

    // Assert the original object remains unchanged
    expect(originalObj).toEqual({ a: 1, b: { c: 2 } });

    // Assert the cloned object has been modified
    expect(clonedObj).toEqual({ a: 1, b: { c: 3 } });
  });
});