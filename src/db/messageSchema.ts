import {
  AnyPgColumn,
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { channels, user } from "./schema";
import { relations } from "drizzle-orm";
