import { ApiProperty } from "@nestjs/swagger";
import { SubscriptionPlanType } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { features } from "process";

export class CreateSubscriptionPlanDto {
    @ApiProperty({example: "Basic"})
    @IsEnum(SubscriptionPlanType)
    type: SubscriptionPlanType

    @ApiProperty({
        example:20
    })
    @IsNumber()
    price: number

    @ApiProperty({example: ["dafs" , "wer", "utywu", "lojk", "eerw"]})
    @IsString()
    features: string[]
}
