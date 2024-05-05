export interface CreateStudentDto {
    name: string;
    surname: string;
    stdNumber: string;
    grades: [
        {
            code: string;
            value: number;
        }
    ]
}