import { FilterQuery, Query } from "mongoose";
import dayjs from "dayjs";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })) as FilterQuery<T>[],
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "date",
      "dateRange",
    ];
    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  dateFilter(dateField = "date") {
    const date = this.query?.date as string;
    const dateRange = this.query?.dateRange as string;

    let rangeFilter: any = null;
    let skipFilter = false;

    if (date) {
      const day = dayjs(date);
      rangeFilter = {
        $gte: day.startOf("day").toDate(),
        $lte: day.endOf("day").toDate(),
      };
    }

    if (dateRange) {
      const today = dayjs();
      switch (dateRange) {
        case "all":
          skipFilter = true;
          break;
        case "today":
          rangeFilter = {
            $gte: today.startOf("day").toDate(),
            $lte: today.endOf("day").toDate(),
          };
          break;
        case "current-week":
          rangeFilter = {
            $gte: today.startOf("week").toDate(),
            $lte: today.endOf("week").toDate(),
          };
          break;
        case "last-week":
          rangeFilter = {
            $gte: today.subtract(1, "week").startOf("week").toDate(),
            $lte: today.subtract(1, "week").endOf("week").toDate(),
          };
          break;
        case "current-month":
          rangeFilter = {
            $gte: today.startOf("month").toDate(),
            $lte: today.endOf("month").toDate(),
          };
          break;
        case "last-month":
          rangeFilter = {
            $gte: today.subtract(1, "month").startOf("month").toDate(),
            $lte: today.subtract(1, "month").endOf("month").toDate(),
          };
          break;
      }
    }

    if (!skipFilter && rangeFilter && Object.keys(rangeFilter).length > 0) {
      this.modelQuery = this.modelQuery.find({
        [dateField]: rangeFilter,
      } as FilterQuery<T>);
    }

    return this;
  }

  sort() {
    const sort =
      (this.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
