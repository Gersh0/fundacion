import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/auth.entity";
import { JwtPayload } from "../interfaces/jtw.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){
        super({
            secretOrKey:process.env.SECRET_KEY,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        });
    }
    async validate(payload:JwtPayload){
        const {email}=payload;

        const user=await this.userRepository.findOneBy({email});
        if(!user){
            throw new BadRequestException("Unauthorized");
        }
        if(!user.isActive){
            throw new BadRequestException("Unauthorized");
        }
        
        return user;
    }
}