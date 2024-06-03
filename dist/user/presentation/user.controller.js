"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../application/user.service");
const signIn_request_dto_1 = require("../application/dto/signIn.request.dto");
const signUp_request_dto_1 = require("../application/dto/signUp.request.dto");
const changePassword_request_dto_1 = require("../application/dto/changePassword.request.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signIn(signInRequestDto) {
        return this.userService.signIn(signInRequestDto);
    }
    myInfo(id) {
        return this.userService.getMyInfo(parseInt(id));
    }
    signUp(signUpRequestDto) {
        return this.userService.signUp(signUpRequestDto);
    }
    changePass(id, changePasswowrdRequestDto) {
        return this.userService.changePassword(changePasswowrdRequestDto);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signIn_request_dto_1.SignInRequestDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myInfo", null);
__decorate([
    (0, common_1.Post)('sign-up'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUp_request_dto_1.SignUpRequestDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, changePassword_request_dto_1.ChangePasswordRequestDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePass", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map