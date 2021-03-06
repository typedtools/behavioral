import { plainToClass } from 'class-transformer';
import { Step } from './Step';

export const transformSteps = ({ obj, key }: any): Step[] => {
  let prevKeyword: string;

  return obj[key].map((step: any) => {
    const result: any = { ...step };
    const keyword = (step.keyword ?? step.type).toLowerCase().trim();

    if (['and', '*'].includes(keyword)) {
      result.type = prevKeyword;
    } else {
      prevKeyword = keyword;
      result.type = keyword;
    }

    return plainToClass(Step, result, { strategy: 'excludeAll' });
  });
}