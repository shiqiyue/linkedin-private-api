import { castArray, isArray, isPlainObject, mapValues, reduce } from 'lodash';
import { stringify } from 'querystring';

const encodeFilter = (value: string | string[], key: string) => encodeURIComponent(`${key}->${castArray(value).join('|')}`);
const encodeFilter2 = (value: string | string[], key: string) => encodeURIComponent(`${key}:${castArray(value).join('|')}`);
const encodeFilter3 = (value: string | string[], key: string) => (`${key}:${castArray(value).join(',')}`);

export const paramsSerializer = (params: Record<string, string | Record<string, string>>): string => {
  const encodedParams = mapValues(params, value => {
    if (!isArray(value) && !isPlainObject(value)) {
      return value.toString();
    }

    if (isArray(value)) {
      return `List(${value.join(',')})`;
    }

    const encodedList = reduce(
      value as Record<string, string>,
      (res, filterVal, filterKey) => `${res}${res ? ',' : ''}${encodeFilter(filterVal, filterKey)}`,
      '',
    );

    return `List(${encodedList})`;
  });

  return stringify(encodedParams, undefined, undefined, {
    encodeURIComponent: uri => uri,
  });
};


export const paramsSerializer2 = (params: Record<string, string | Record<string, string>>): string => {
  const encodedParams = mapValues(params, value => {
    if (!isArray(value) && !isPlainObject(value)) {
      return value.toString();
    }

    if (isArray(value)) {
      return `List(${value.join(',')})`;
    }

    const encodedList = reduce(
        value as Record<string, string>,
        (res, filterVal, filterKey) => `${res}${res ? ',' : ''}${encodeFilter2(filterVal, filterKey)}`,
        '',
    );

    return `(${encodedList})`;
  });

  return stringify(encodedParams, undefined, undefined, {
    encodeURIComponent: uri => uri,
  });
};

export const querySerializer = (params): string => {
  const encodedParams = mapValues(params, value => {
    if (!isArray(value) && !isPlainObject(value)) {
      return value.toString();
    }

    if (isArray(value)) {
      return `List(${value.join(',')})`;
    }

    const encodedList = querySerializer(value)

    return `${encodedList}`;
  });

  const rs = [];
  for (const encodedParamsKey in encodedParams) {
    rs.push(`${encodedParamsKey}:${castArray(encodedParams[encodedParamsKey]).join(',')}`)
  }

  return `(${rs.join(',')})`
}
