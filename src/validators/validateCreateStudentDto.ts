import { CreateStudentDto } from "../dtos/createStudentDto";
import { CustomResponse } from "../utils//customResponse";

export const validateCreateStudentDto = (dto: CreateStudentDto): CustomResponse => {
    if(!dto.name) return { message: 'Name is missing.', success: false };
    if(!dto.surname) return { message: 'Surname is missing.', success: false };
    if(!dto.stdNumber) return { message: 'Student number is missing.', success: false };
    if(!dto.grades) return { message: 'Grades are missing.', success: false };

    if(dto.name.length < 2 || dto.name.length > 50) return { message: 'Name is invalid.', success: false };
    if(dto.surname.length < 2 || dto.surname.length > 50) return { message: 'Surname is invalid.', success: false };
    if(dto.stdNumber.length < 2 || dto.stdNumber.length > 50) return { message: 'Student number is invalid.', success: false };

    for (let i = 0; i < dto.grades.length; i++) {
        if (!dto.grades[i].code) return { message: 'Grade code is missing.', success: false };
        if (!dto.grades[i].value) return { message: 'Grade value is missing.', success: false };
        if (dto.grades[i].value < 0 || dto.grades[i].value > 100) return { message: 'Grade value is invalid.', success: false };
    }

    return { message: 'Student information is valid.', success: true };
}