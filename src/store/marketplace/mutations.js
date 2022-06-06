export function setSelectedMarketplace (state, { id, label, administrator }) {
  state.marketplace.id = id
  state.marketplace.label = label
  state.marketplace.administrator = administrator
}
