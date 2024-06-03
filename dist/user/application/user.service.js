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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../domain/user.entity");
const auth_service_1 = require("../../auth/application/auth.service");
const bcrypt = require("bcrypt");
const myInfo_request_dto_1 = require("./dto/myInfo.request.dto");
const signUp_response_dto_1 = require("./dto/signUp.response.dto");
const validateUser_request_dto_1 = require("../../auth/application/dto/validateUser.request.dto");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userRepository, authService, configService) {
        this.userRepository = userRepository;
        this.authService = authService;
        this.configService = configService;
    }
    async findOne(userEmail) {
        return this.userRepository.findOne({ where: { email: userEmail } });
    }
    async signIn(signInRequestDto) {
        console.log('user signIn');
        console.log(signInRequestDto);
        const { email, id } = signInRequestDto;
        const accessToken = this.authService.signWithJwt({ id, email });
        return { accessToken };
    }
    async signUp(signUpRequestDto) {
        const { email, password } = signUpRequestDto;
        const hashPassword = await bcrypt.hash(password, this.configService.get('SALT_ROUNDS'));
        const isRegisteredEmail = await this.userRepository.findOne({ where: { email } });
        if (isRegisteredEmail) {
            throw new common_1.BadRequestException('Email already exists');
        }
        const isValidEmail = email.indexOf('@') === email.lastIndexOf('@');
        if (!isValidEmail) {
            throw new common_1.BadRequestException('Email should contain only one @');
        }
        if (email.split(' ').length > 1) {
            throw new common_1.BadRequestException('Email should not contain the empty space');
        }
        const user = new user_entity_1.User({ email, password: hashPassword });
        await this.userRepository.save(user);
        const newUser = await this.userRepository.findOne({ where: { email } });
        return new signUp_response_dto_1.SignUpResponseDto(newUser);
    }
    async getMyInfo(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        const { id, email, createdAt } = user;
        return new myInfo_request_dto_1.MyInfoResponseDto({ id, email, createdAt });
    }
    async changePassword(changePasswordRequestDto) {
        const { email, password, newPassword } = changePasswordRequestDto;
        const user = await this.userRepository.findOne({ where: { email } });
        const validUser = await this.authService.validateUser(new validateUser_request_dto_1.ValidateUserRequestDto({ email, password }));
        if (!validUser) {
            throw new common_1.UnauthorizedException();
        }
        user.password = await bcrypt.hash(newPassword, this.configService.get('SALT_ROUNDS'));
        const { id, createdAt, updatedAt } = await this.userRepository.save(user);
        return { id, createdAt, updatedAt };
    }
    async deleteMyInfo(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.BadRequestException('User does not exist');
        }
        await this.userRepository.softDelete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map