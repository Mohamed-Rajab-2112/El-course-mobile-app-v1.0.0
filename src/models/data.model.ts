// import {Category} from "./category.model"

/*========================================================*/
/*=============== Student interface======================*/
/*========================================================*/

interface Student {
  id: number;
  firstName: string;
  fatherName: string;
  lastName: string;
  email: string;
  interests: Category[];
  interestedCourses: Course[];
  joinedCourses: Course[];
}

/*DATABASE NOTATION FOR STUDENT DATA
 =====================================
 student collection
 ==================
 id: number;
 firstName: string;
 fatherName: string;
 lastName: string;
 email: string;
 interests: Category[];

 student_interested_joined_courses collection
 =====================================
 id: number  //student id
 coursesInterested: Course[];
 coursesJoined: Course[];
 */

/*========================================================*/
/*=============== TRAINING CENTER interface===============*/
/*========================================================*/

interface TrainingCenter {
  id: number;
  name: string;
  email: string;
  area: string;
  address?: string;
  phone?: string[];
  about?: string;
  logo: string;
  numCourses: number;
  longitude?: number;
  altitude?: number;
}

/*DATABASE NOTATION FOR TRAINING CENTER DATA
 ============================================
 training_center_header COLLECTION
 =================================
 id: number
 name: string
 logo: string;
 numCourses: number
 area: string;

 training_center_detail COLLECTION
 =================================
 id: number
 address: string;
 phone: string[];
 about: string;
 longitude: number;
 altitude: number;
 email: string;
 */


/*========================================================*/
/*=============== COURSE interface======================*/
/*========================================================*/

interface Course {
  id: number;
  name: string;
  duration?: number;
  countOfStudent?: number;
  outline?: string[];
  price: number;
  area: string;
  trainingCenterName?: string;
  trainingCenterId: number;
  availability: boolean;
  interested: number;
  joined: number;
  image: string;
  brief?: string;
  rating: number;
  category: string;
  faq?: question[];
}

interface question {
  question: string;
  answer: string;
}


/*DATABASE NOTATION FOR COURSE DATA
 =================================
 course_header COLLECTION
 ==========================
 id: number
 name: string
 price: number;
 area: string;
 rating: number;
 category: string;
 availability: boolean;
 image: string;
 interested: number;
 joined: number;
 trainingCenterId: number;

 course_detail COLLECTION
 ==========================
 id: number
 duration: number;
 countOfStudent: number;
 outline: string[];
 trainingCenterName: string;
 brief: string;
 faq: question[];
 */

/*========================================================*/
/*=============== CATEGORY interface======================*/
/*========================================================*/

interface Category {
  id: number,
  name: string,
  image: string,
  count: number
}

/*DATABASE NOTATION FOR CATEGORY DATA
 =====================================
 category COLLECTION
 =================================
 id: number;
 name: string;
 image: string;
 count: number;
 */
