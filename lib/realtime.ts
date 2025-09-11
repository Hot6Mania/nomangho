import { supabase } from './supabaseClient'
export type PresenceMeta = { name: string; isLeader?: boolean; avatar?: string }

export function joinRoomChannel(roomId: string, me: PresenceMeta) {
  const channel = supabase.channel(`room:${roomId}`, {
    config: { broadcast: { self: true }, presence: { key: me.name } },
  })

  channel.on('presence', { event: 'sync' }, () => {
    console.log('members', channel.presenceState())
  })

  channel.on('broadcast', { event: 'chat' }, (p) => {
    console.log('chat', p.payload)
  })

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track(me)
    }
  })

  return {
    sendChat: (user: string, text: string) =>
      channel.send({ type: 'broadcast', event: 'chat', payload: { user, text } }),
    leave: async () => {
      await channel.untrack()
      await channel.unsubscribe()
    },
  }
}
