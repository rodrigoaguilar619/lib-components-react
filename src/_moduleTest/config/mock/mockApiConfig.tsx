import { URL_CATALOG_DATA_LIST_GET, URL_DATATABLE_EXPAND_LIST_GET, URL_DATATABLE_LIST_GET } from "@app/_moduleTest/catalogs/uriCatalog";
import { URL_API_USER_DATA_GET } from "@app/catalogs/uriCatalog";

const RESPONSE_DATATABLE_LIST_GET: any[] = [
  { "id": 1, "answer": true,   "currency": 1234567,        "currencyZeroPad": 1234567,       "currencySymbol": 1234567,         "percentageSymbol": 1234567,        "currencyComma": 1234567,       "currencyInteger": 1234567,       "currencyAllOptions": 1234567,           "dateMillis": 1609351640000  },
  { "id": 2, "answer": false,  "currency": 8775456.21,     "currencyZeroPad": 8775456.21,    "currencySymbol": 8775456.21,      "percentageSymbol": 8775456.21,     "currencyComma": 8775456.21,    "currencyInteger": 8775456.21,    "currencyAllOptions": 8775456.21,        "dateMillis": 1509351640000  },
  { "id": 3, "answer": null,   "currency": 45666767.6777,  "currencyZeroPad": 45666767.6777, "currencySymbol": 45666767.6777,   "percentageSymbol": 45666767.6777,  "currencyComma": 45666767.6777, "currencyInteger": 45666767.6777, "currencyAllOptions": 45666767.6777,     "dateMillis": 1609351640000  },
  { "id": 4, "answer": null,   "currency": null,           "currencyZeroPad": null,          "currencySymbol": null,            "percentageSymbol": null,           "currencyComma": null,          "currencyInteger": null,          "currencyAllOptions": null,              "dateMillis": 1309351640000  },
  { "id": 5, "answer": true,   "currency": 1234567,        "currencyZeroPad": 1234567,       "currencySymbol": 1234567,         "percentageSymbol": 1234567,        "currencyComma": 1234567,       "currencyInteger": 1234567,       "currencyAllOptions": 1234567,           "dateMillis": 1209351640000  },
  { "id": 6, "answer": false,  "currency": 8775456.21,     "currencyZeroPad": 8775456.21,    "currencySymbol": 8775456.21,      "percentageSymbol": 8775456.21,     "currencyComma": 8775456.21,    "currencyInteger": 8775456.21,    "currencyAllOptions": 8775456.21,        "dateMillis": 1705351640000  },
  { "id": 7, "answer": null,   "currency": 45666767.6777,  "currencyZeroPad": 45666767.6777, "currencySymbol": 45666767.6777,   "percentageSymbol": 45666767.6777,  "currencyComma": 45666767.6777, "currencyInteger": 45666767.6777, "currencyAllOptions": 45666767.6777,     "dateMillis": 1704351640000  },
  { "id": 8, "answer": null,   "currency": null,           "currencyZeroPad": null,          "currencySymbol": null,            "percentageSymbol": null,           "currencyComma": null,          "currencyInteger": null,          "currencyAllOptions": null,              "dateMillis": 1703351640000  },
  { "id": 9, "answer": true,   "currency": 1234567,        "currencyZeroPad": 1234567,       "currencySymbol": 1234567,         "percentageSymbol": 1234567,        "currencyComma": 1234567,       "currencyInteger": 1234567,       "currencyAllOptions": 1234567,           "dateMillis": 1702351640000  },
  { "id": 10, "answer": false,  "currency": 8775456.21,     "currencyZeroPad": 8775456.21,    "currencySymbol": 8775456.21,     "percentageSymbol": 8775456.21,     "currencyComma": 8775456.21,    "currencyInteger": 8775456.21,    "currencyAllOptions": 8775456.21,       "dateMillis": "asdasdas"  },
  { "id": 11, "answer": null,   "currency": 45666767.6777,  "currencyZeroPad": 45666767.6777, "currencySymbol": 45666767.6777,  "percentageSymbol": 45666767.6777,  "currencyComma": 45666767.6777, "currencyInteger": 45666767.6777, "currencyAllOptions": 45666767.6777,     "dateMillis": "1709351640000" },
  { "id": 12, "answer": null,   "currency": null,           "currencyZeroPad": null,          "currencySymbol": null,           "percentageSymbol": null,           "currencyComma": null,          "currencyInteger": null,          "currencyAllOptions": null,              "dateMillis": null },
];

const RESPONSE_DATATABLE_EXPAND_LIST_GET: any[] = [
  { id: 1, name: 'John',  surname: 'Smith',  age: 25,  addressList: [{ streetAddress: '123 Main', city: 'New York', state: 'NY', zip: '10011' }] },
  { id: 2, name: 'Peter', surname: 'Jones',  age: 35,  addressList: [{ streetAddress: '124 Main', city: 'New York', state: 'NY', zip: '10011' }] },
  { id: 3, name: 'Mary',  surname: 'Thomas', age: 45,  addressList: [{ streetAddress: '125 Main', city: 'New York', state: 'NY', zip: '10011' }] },
  { id: 4, name: 'Susan', surname: 'Lewis',  age: 55,  addressList: [{ streetAddress: '126 Main', city: 'New York', state: 'NY', zip: '10011' }] },
  { id: 5, name: 'Mark',  surname: 'Robert', age: 65,  addressList: [{ streetAddress: '127 Main', city: 'New York', state: 'NY', zip: '10011' }] },
];

const RESPONSE_CATALOG_DATA_LIST_GET: any[] = [
  { description: 'New York', id: 'NY' },
  { description: 'Rome', id: 'RM' },
  { description: 'London', id: 'LDN' },
  { description: 'Istanbul', id: 'IST' },
  { description: 'Paris', id: 'PRS' }
];

const RESPONSE_API_USER_DATA_GET: any = {
  userName: 'ADMIN', userRols: ["admin"]
}

export const mockApiConfigList = [
    { method: 'post', url: URL_DATATABLE_LIST_GET, response: { data: RESPONSE_DATATABLE_LIST_GET }, status: 200 },
    { method: 'post', url: URL_CATALOG_DATA_LIST_GET, response: { data: RESPONSE_CATALOG_DATA_LIST_GET }, status: 200 },
    { method: 'post', url: URL_DATATABLE_EXPAND_LIST_GET, response: { data: RESPONSE_DATATABLE_EXPAND_LIST_GET }, status: 200 },
    { method: 'post', url: URL_API_USER_DATA_GET, response: { data: RESPONSE_API_USER_DATA_GET }, status: 200 },
    //{ method: 'post', url: URL_DATATABLE_LIST_GET, response: { message: "error business logic" }, status: 422 }
  ];