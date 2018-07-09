import { differenceInMinutes } from 'date-fns';

export function isLessThanTenMinutes(conversion: {
  result: number,
  createdAt: Date,
}): boolean {
  const creationDiference = differenceInMinutes(
    new Date(),
    new Date(conversion.createdAt),
  );
  const limitUntilCallBackend = 10;

  return creationDiference <= limitUntilCallBackend;
}
