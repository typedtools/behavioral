import { plainToClass } from 'class-transformer';
import { Tag } from './Tag';

export const transformTags = ({ obj, key }: any): Tag[] => {
  return obj[key].map((astTag: any) => {
    const args: any[] = [];
    const match = /@([a-zA-Z0-9]+)(\((.*)\))?/.exec(astTag.name) as RegExpExecArray;

    if (match.length > 3) {
      args.push(match[3])
    }

    return plainToClass(Tag, {
      ...astTag,
      name: match[1],
      arguments: args,
    }, { strategy: 'excludeAll' });
  });
}
