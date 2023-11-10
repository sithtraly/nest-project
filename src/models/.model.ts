import AttendentModel from "./attendents.model"
import DocumentModel from "./document.model"
import { RoleModel } from "./role.model"
import ScoreModel from "./score.model"
import StudentsModel from "./student.model"
import SubjectModel from "./subject.model"
import { UserModel } from "./user.model"

const models = [
  RoleModel,
  UserModel,
  StudentsModel,
  SubjectModel,
  DocumentModel,
  AttendentModel,
  ScoreModel,
]

export default models