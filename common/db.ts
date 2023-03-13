// Adapter for async storage. In the app, please don't use any
// async-storage APIs directly. Create a function here and use
// that instead.
import AsyncStorage from "@react-native-async-storage/async-storage"
import {dbState} from "./state"

export async function store<K extends keyof typeof dbState>(
  k: K,
  v: {[Property in keyof (typeof dbState)[K]]: unknown}
) {
  if (!k || !v) {
    throw "Key (" + k + ") or value (" + v + ") cannot be empty"
  }
  const jsonValue = JSON.stringify(v)
  await AsyncStorage.setItem(k, jsonValue)
}

export async function load<K extends keyof typeof dbState>(
  k: K
): Promise<(typeof dbState)[K] | undefined> {
  if (!(k in dbState)) {
    throw "Invalid DB key '" + k + "' does not exist"
  }

  if (!dbState[k]) {
    // no value set
    throw "No default DB state set for key '" + k + "'"
  }

  const jsonValue = await AsyncStorage.getItem(k)

  if (jsonValue) {
    // DB state exists
    return JSON.parse(jsonValue)
  }

  return undefined
}

export async function remove<K extends keyof typeof dbState>(k: K) {
  await AsyncStorage.removeItem(k)
}

export async function updateStore<K extends keyof typeof dbState>(
  k: K,
  v: Partial<{[Property in keyof (typeof dbState)[K]]: unknown}>
) {
  store(k, Object.assign(dbState[k], v))
}

const dbMigrations: {[key: number]: [() => Promise<void>]} = {
  // version 0 contains default migrations that are
  // run on each version change. See registerMigration
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  0: [],
}

// Where we cannot delete state, use migrations. Each module
// can call this function to register a migration for a specific
// version.
export function registerMigration(v: number, mf: () => Promise<void>) {
  if (v < 0 || v > dbState.meta.version) {
    throw "No DB version '" + dbState.meta.version + "' exists. Please create first."
  }

  if (!dbMigrations[v]) {
    dbMigrations[v] = [mf]
    return
  }

  // add to existing list of migrations
  dbMigrations[v].push(mf)
}

export async function migrate() {
  const storedMeta = await load("meta")

  // no db yet, new install
  // no migrations needed
  if (!storedMeta) {
    return
  }

  // this version of db
  const currVersion = dbState.meta.version

  // run migrations from old stored version to this
  // version
  for (let i = storedMeta.version; i <= currVersion; i++) {
    if (dbMigrations[i] && dbMigrations[i].length) {
      for (const mf of dbMigrations[i]) {
        await mf()
      }
    }
  }

  // finally run the default migrations
  if (storedMeta.version !== currVersion) {
    for (const mf of dbMigrations[0]) {
      await mf()
    }
  }
}
