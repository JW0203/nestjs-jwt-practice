"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpResponseDto = void 0;
class SignUpResponseDto {
    constructor(user) {
        if (user) {
            this.id = user.id;
            this.email = user.email;
            this.createdAt = user.createdAt;
        }
    }
}
exports.SignUpResponseDto = SignUpResponseDto;
//# sourceMappingURL=signUp.response.dto.js.map