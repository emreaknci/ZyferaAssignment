import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CreateStudentDto } from './src/dtos/createStudentDto';
import { validateCreateStudentDto } from './src/validators/validateCreateStudentDto';
import Student, { IStudent } from './src/models/student';
import database from './src/config/database';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const PORT = process.env.PORT || 3000;

database();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.post("/api/create-student", async (req: Request, res: Response) => {
    try {
        const dto: CreateStudentDto = req.body;

        const validationResult = validateCreateStudentDto(dto);
        if (!validationResult.success)
            return res.json(validationResult);

        const existingStudent = await Student.findOne({ stdNumber: dto.stdNumber });
        if (existingStudent)
            return res.json({ success: false, message: "Student already exists" });

        const uniqueGradeCodes = dto.grades
            .map(grade => grade.code)
            .filter((value, index, self) => self.indexOf(value) === index);

        const averageGrades = uniqueGradeCodes.map(code => {
            const gradesWithSameCode = dto.grades.filter(grade => grade.code === code);
            const gradeValues = gradesWithSameCode.map(grade => grade.value);
            const averageValue = gradeValues.reduce((acc, value) => acc + value, 0) / gradeValues.length;

            return { code, value: averageValue };
        });

        console.log(averageGrades)


        const newStudent = new Student({
            name: dto.name, surname: dto.surname,
            stdNumber: dto.stdNumber, grades: averageGrades
        });

        await newStudent.save();

        return res.json({ data: newStudent, success: true, message: "Student created successfully" });
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
});