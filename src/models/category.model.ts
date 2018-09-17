export interface Category {
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
 count: number;
 mainCategoryId: number; //the main category id
 */
