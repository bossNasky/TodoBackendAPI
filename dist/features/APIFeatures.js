"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIFeatures = void 0;
class APIFeatures {
    constructor(query, queryObject) {
        this.query = query;
        this.queryObject = queryObject;
    }
    filter() {
        this.query = this.query.find(this.queryObject);
        return this;
    }
}
exports.APIFeatures = APIFeatures;
//# sourceMappingURL=APIFeatures.js.map