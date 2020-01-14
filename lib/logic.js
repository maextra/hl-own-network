/**
 * Create Assessment
 * @param {by.bsuir.fksis.recordbook.CreateAssessment} createAssessment - assessment info
 * @transaction
 */
async function createAssessment(createAssessment) {
    let assessmentRegistry = await getAssetRegistry("by.bsuir.fksis.recordbook.Assessment");
    let allAssessment = await assessmentRegistry.getAll();
    
    let factory = getFactory();
    let newAssessment = factory.newResource('by.bsuir.fksis.recordbook', 'Assessment', createAssessment.assessmentId);
    
    let teacherRegistry = await getParticipantRegistry("by.bsuir.fksis.recordbook.Teacher");
    let subjectRegistry = await getAssetRegistry("by.bsuir.fksis.recordbook.Subject");
    let studentRegistry = await getParticipantRegistry("by.bsuir.fksis.recordbook.Student");

    newAssessment.teacher = await teacherRegistry.get(createAssessment.teacherId);
    newAssessment.subject = await subjectRegistry.get(createAssessment.subjectId);
    newAssessment.student = await studentRegistry.get(createAssessment.studentId);
    newAssessment.rating = 0;
    newAssessment.attempt = 0;

    await assessmentRegistry.add(newAssessment);
}

/**
 * Rate the student
 * @param {by.bsuir.fksis.recordbook.Rate} rate - rate info
 * @transaction
 */
async function rateStudent(rate) {
    let assessmentRegistry = await getAssetRegistry("by.bsuir.fksis.recordbook.Assessment");
    let assessment = await assessmentRegistry.get(rate.assessmentId);

    assessment.attempt = assessment.attempt + 1;
    assessment.rating = rate.rating;
    
    await assessmentRegistry.update(assessment);
}