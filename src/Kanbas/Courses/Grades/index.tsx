import { assignments, enrollments, grades, users } from "../../Database";
import { useParams } from "react-router-dom";
import { FaFileImport, FaFileExport, FaArrowAltCircleDown, FaFilter } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
function Grades() {
  const { courseId } = useParams();
  console.log(courseId);
  const as = assignments.filter((assignment) => assignment.course === courseId);
  console.log(as);
  const es = enrollments.filter((enrollment) => enrollment.course === courseId);
  console.log(es);
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
      <div></div>
      <div className="d-flex align-items-center">
        <button className="btn btn-light top-buttons"><FaFileImport /> Import</button>
        <button className="btn btn-light top-buttons"><FaFileExport />Export <FaArrowAltCircleDown /></button>
        <button className="btn btn-light top-buttons"><FaGear /></button>
      </div>
      </div>
      <div className="row mb-3">
      <div className="col-6">
        <h4>Student Names</h4>
        <input
          type="text"
          className="form-control"
          placeholder="〇 Search Students"
        />
      </div>
      <div className="col-6">
        <h4>Assignment Names</h4>
        <input
          type="text"
          className="form-control"
          placeholder="〇 Search Assignments"
        />
      </div>
    </div>
    <button className="btn btn-light"><FaFilter /> Apply Filters</button>

    <br />
    <br />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-head">
            <th>Student Name</th>
            {as.map((assignment) => (<th className="text-center">{assignment.title}<br /><span style={{ fontWeight: 'normal', backgroundColor: 'transparent' }}>Out of 100</span>
</th>))}
          </thead>
          <tbody>
            {es.map((enrollment) => {
              const user = users.find((user) => user._id === enrollment.user);
              return (
                <tr>
                   <td style={{ color: 'red' }}>{user?.firstName} {user?.lastName}</td>
                   {as.map((assignment) => {
                     const grade = grades.find(
                       (grade) => grade.student === enrollment.user && grade.assignment === assignment._id);
                       return (<td align="center" valign="middle">{grade?.grade || ""}</td>);})}
                </tr>);
            })}
          </tbody></table>
      </div></div>);
}
export default Grades;
