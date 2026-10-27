export type ActiveTab = 
  | 'home' 
  | 'objectives' 
  | 'explain' 
  | 'table' 
  | 'games' 
  | 'case' 
  | 'differentiated' 
  | 'quiz' 
  | 'feedback' 
  | 'teacher';

export interface GameScore {
  magicAddition: number;
  subtractionIsland: number;
  matchPairs: number;
  findError: number;
}

export interface QuizQuestion {
  id: number;
  type: 'addition' | 'subtraction' | 'commutative' | 'blank' | 'context';
  typeLabel: string;
  question: string;
  visual?: {
    type: 'apples' | 'balloons' | 'pears' | 'stars';
    countA?: number;
    countB?: number;
    operator?: '+' | '-';
  };
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface TeacherDescriptor {
  criterion: string;
  descriptor: string;
  maxScore: number;
}
