/**
 * StudentInfo
 */
export class StudentInfo {
    constructor(
        // public _id: string,
         public batchId: number,
        // public batchName: string,
        public DateOfAdmission: Date,
        public idPrefix: string,
        public groupId: number,
        public standardId: number,
        // public standardName: string,
         public classId: number,
        // public className: string,
        public seatNo: number,
        public rollNo: number,
        public grNo: number,
        public studentId: number,
        public firstName: string,
        public lastName: string,
        public postalAddress: string,
        public cityVillage: string,
        public pinCode: number,
        public parentPhone: string,
        public schoolLeavingDate: Date,
        public schoolLeavingRemark: string,
        public Gender: GenderType,
        public nickName: string,
        public permanentAddress: string,
        public caste: string,
        public subCaste: string,
        public mobileNo1: string,
        public mobileNo2: string,
        public personalEmail: string,
        public parentEmail: string,
        public bloodgroupId: number,
        public talents: string,
        public hobbies: string,
        public notes: string,
        public referalsaint: string,
        public satsang: SatangiType,
        public satsanginfo: string,
        public magazines: string,
        public ekadashi: EkadashiType,
        public satsangExam: string,
        public satsangEffect: string,
        public exAPC: string,
        // public dedication: string,
        public hostelBlockNo: string,
        public hostelRoomNo: string,
        public hostelOtherDetails: string,
        public hostelSeva: string,
        public studyProgressId: number,
        public studyProgressDisplay: string,
        public behaviourDisplay: string,
        public studiesRemark: string
        ) {}
}

enum GenderType {
    Male = 1,
    Female = 2    
}

enum EkadashiType{
    Farali = 1,
    Nirjala = 2,
    No = 3
}

enum SatangiType {
    Satsangi = 10,
    Gunbhavi = 20,
    Other = 30    
}