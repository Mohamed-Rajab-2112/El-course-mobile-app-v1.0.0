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

