<script lang="ts">
  import { ChatBubble, Card, Input, Button } from '$lib';
</script>

<div class="mljr-space-y-8">
  <!-- Basic -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">User vs Bot Messages</h3>
    <div class="mljr-space-y-3">
      <ChatBubble message="Hello! Can you help me with something?" variant="user" position="right" />
      <ChatBubble message="Of course! I'd be happy to help. What do you need?" variant="bot" position="left" />
      <ChatBubble message="I'm looking for information about your pricing plans." variant="user" position="right" />
      <ChatBubble
        message="We have three plans: Free, Pro ($12/mo), and Team ($49/mo). The Pro plan includes unlimited projects and priority support."
        variant="bot"
        position="left"
      />
    </div>
  </section>

  <!-- With Avatar and Username -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">With Avatar and Metadata</h3>
    <div class="mljr-space-y-3">
      <ChatBubble
        message="Hey team, just pushed the new feature branch!"
        variant="user"
        position="right"
        username="Alice"
        timestamp="2:34 PM"
        status="read"
      />
      <ChatBubble
        message="Great work! I'll review it shortly."
        variant="bot"
        position="left"
        username="Bob"
        timestamp="2:35 PM"
      />
      <ChatBubble
        message="Let me know if you need any changes."
        variant="user"
        position="right"
        username="Alice"
        timestamp="2:36 PM"
        status="delivered"
      />
    </div>
  </section>

  <!-- System Messages -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">System Messages</h3>
    <div class="mljr-space-y-3">
      <ChatBubble message="Alice joined the chat" variant="system" />
      <ChatBubble message="Hello everyone!" variant="user" position="right" username="Alice" />
      <ChatBubble message="Bob left the chat" variant="system" />
    </div>
  </section>

  <!-- Message Status -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Message Status Indicators</h3>
    <div class="mljr-space-y-3">
      <ChatBubble message="Sending..." variant="user" position="right" status="sent" />
      <ChatBubble message="Delivered" variant="user" position="right" status="delivered" />
      <ChatBubble message="Read ✓✓" variant="user" position="right" status="read" />
    </div>
  </section>

  <!-- Typing Indicator -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Typing Indicator</h3>
    <div class="mljr-space-y-3">
      <ChatBubble message="Where is my order?" variant="user" position="right" />
      <ChatBubble message="" variant="bot" position="left" status="typing" username="Support Bot" />
    </div>
  </section>

  <!-- Full Chat UI -->
  <section>
    <h3 class="mljr-h4 mljr-mb-4">Chat Interface</h3>
    <Card>
      <!-- Chat header -->
      <div class="mljr-flex mljr-items-center mljr-gap-3 mljr-pb-4 mljr-border-b mljr-border-muted mljr-mb-4">
        <div class="mljr-w-10 mljr-h-10 mljr-bg-gradient-primary mljr-rounded-full mljr-flex mljr-items-center mljr-justify-center mljr-text-white mljr-font-bold">
          AI
        </div>
        <div>
          <p class="mljr-font-medium">AI Assistant</p>
          <p class="mljr-text-xs mljr-text-success-500">● Online</p>
        </div>
      </div>

      <!-- Messages -->
      <div class="mljr-space-y-3 mljr-mb-4 mljr-min-h-32">
        <ChatBubble message="Hi! How can I help you today?" variant="bot" position="left" timestamp="10:00" />
        <ChatBubble message="I need help setting up the library." variant="user" position="right" timestamp="10:01" status="read" />
        <ChatBubble
          message="Sure! Start with: npm install @mljr/css @mljr/svelte — then import the styles and you're good to go!"
          variant="bot"
          position="left"
          timestamp="10:01"
        />
      </div>

      <!-- Input -->
      <div class="mljr-flex mljr-gap-2 mljr-border-t mljr-border-muted mljr-pt-4">
        <input type="text" placeholder="Type a message..." class="mljr-input mljr-flex-1" />
        <Button variant="primary" size="sm">Send</Button>
      </div>
    </Card>
  </section>
</div>
