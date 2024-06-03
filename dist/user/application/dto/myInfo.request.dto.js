"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyInfoResponseDto = void 0;
class MyInfoResponseDto {
    constructor(params) {
        if (params) {
            this.id = params.id;
            this.email = params.email;
            this.createdAt = params.createdAt;
        }
    }
}
exports.MyInfoResponseDto = MyInfoResponseDto;
//# sourceMappingURL=myInfo.request.dto.js.map