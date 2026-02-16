<script setup lang="ts">
const preRef = ref<HTMLElement | null>(null)
const copied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | null = null

const copyCode = async () => {
  if (!preRef.value) {
    return
  }

  const text = preRef.value.innerText || ''
  if (!text.trim()) {
    return
  }

  try {
    await navigator.clipboard.writeText(text)
    copied.value = true

    if (resetTimer) {
      clearTimeout(resetTimer)
    }
    resetTimer = setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch {
    copied.value = false
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <div class="code-block-wrap">
    <button type="button" class="code-copy-btn" @click="copyCode">
      {{ copied ? 'Copied!' : 'Copy' }}
    </button>
    <pre ref="preRef" class="terminal-pre"><slot /></pre>
  </div>
</template>
