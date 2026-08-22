"use client"

const listeners = new Set()
let model = null

const emit = () => listeners.forEach((fn) => fn(null, model))
const request = async (url, options = {}) => {
  const response = await fetch(url, { ...options, credentials: "include" })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(body.error || `Request failed (${response.status})`)
    error.data = body
    error.status = response.status
    throw error
  }
  return body
}

function makeCollection(name) {
  return {
    async getList(page = 1, perPage = 50, opts = {}) {
      const params = new URLSearchParams({ page, perPage })
      if (opts.filter) params.set("filter", opts.filter)
      if (opts.sort) params.set("sort", opts.sort)
      if (opts.expand) params.set("expand", opts.expand)
      return request(`/api/data/${name}?${params}`)
    },
    async getFullList(opts = {}) { return (await this.getList(1, 500, opts)).items },
    async getOne(id, opts = {}) { return request(`/api/data/${name}/${id}?expand=${encodeURIComponent(opts.expand || "")}`) },
    async getFirstListItem(filter, opts = {}) { const data = await this.getList(1, 1, { ...opts, filter }); if (!data.items.length) { const error = new Error("Record not found"); error.status = 404; throw error } return data.items[0] },
    async create(data) { return request(`/api/data/${name}`, { method: "POST", body: data instanceof FormData ? data : JSON.stringify(data), headers: data instanceof FormData ? undefined : { "content-type": "application/json" } }) },
    async update(id, data) { return request(`/api/data/${name}/${id}`, { method: "PATCH", body: data instanceof FormData ? data : JSON.stringify(data), headers: data instanceof FormData ? undefined : { "content-type": "application/json" } }) },
    async delete(id) { return request(`/api/data/${name}/${id}`, { method: "DELETE" }) },
    async authWithPassword(email, password) { const result = await request("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) }); model = result.user; emit(); return result },
    async authRefresh() { const result = await request("/api/auth/me"); model = result.user; emit(); return result },
    async requestOTP(email) { return request("/api/auth/request-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email }) }) },
    async authWithOTP(otpId, otp) { const result = await request("/api/auth/verify-otp", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ otpId, otp }) }); model = result.user; emit(); return { record: result.user } },
  }
}

let api
export function getClientApi() {
  if (api) return api
  api = { register: (data) => request("/api/auth/register", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) }), collection: makeCollection, files: { getUrl: (_record, filename) => filename || "/placeholder.svg" }, cancelAllRequests() {}, authStore: { get token() { return model ? "session" : null }, get model() { return model }, get isValid() { return Boolean(model) }, save(_token, nextModel) { model = nextModel; emit() }, clear() { model = null; emit() }, onChange(fn) { listeners.add(fn); return () => listeners.delete(fn) } } }
  return api
}

export const getClientPb = getClientApi
