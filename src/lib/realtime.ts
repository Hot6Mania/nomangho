import { type RealtimeChannelStatus } from '@supabase/supabase-js'
import { supabase } from './supabaseClient'

export type PresenceMeta = { name: string; isLeader?: boolean; avatar?: string }

type ChatBroadcast = {
  event: string
  type: 'broadcast'
  payload: { user: string; text: string }
}

export function joinRoomChannel(roomId: string, me: PresenceMeta) {
  const channel = supabase.channel(`room:${roomId}`, {
    config: { broadcast: { self: true }, presence: { key: me.name } },
  })

  channel.on('presence', { event: 'sync' }, () => {
    console.log('members', channel.presenceState())
  })

  channel.on('broadcast', { event: 'chat' }, (event: ChatBroadcast) => {
    console.log('chat', event.payload)
  })

  channel.subscribe(async (status: RealtimeChannelStatus) => {
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