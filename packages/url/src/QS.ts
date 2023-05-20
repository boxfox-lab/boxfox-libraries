export namespace QS {
  export function get(
    name: string,
    queryString: string = typeof location !== "undefined" ? location.search : ""
  ): string | undefined {
    return getAll(queryString)[name];
  }

  export function getAll(
    queryString: string = typeof location !== "undefined" ? location.search : ""
  ) {
    var query: Record<string, string> = {};
    var pairs = (
      queryString[0] === "?" ? queryString.substring(1) : queryString
    ).split("&");
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split("=");
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
  }

  export function create(
    params: Record<string, string | number | boolean | undefined>
  ) {
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== undefined)
      .map((key) => `${key}=${encodeURIComponent(String(params[key]))}`)
      .join("&");

    if (!queryString) {
      return "";
    }

    return `?${queryString}`;
  }
}
