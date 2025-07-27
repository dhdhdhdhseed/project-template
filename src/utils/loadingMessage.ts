import type { MessageHandler, MessageParams } from 'element-plus'
import LoadingIcon from '@/components/LoadingIcon.vue'
import { ElMessage } from 'element-plus'

interface LoadingOptions {
  message?: string
  duration?: number
  [key: string]: any
}

class LoadingManager {
  private loadingInstance: MessageHandler | null = null

  /**
   * 显示加载提示
   * @param message 加载提示文字
   * @param options 其他选项
   */
  show(message: string = '加载中...', options: LoadingOptions = {}): MessageHandler {
    // 如果已有加载实例，先关闭
    if (this.loadingInstance) {
      this.loadingInstance.close()
    }

    // 默认配置
    const defaultOptions: MessageParams = {
      duration: 0, // 不自动关闭
      showClose: false,
      message,
      icon: LoadingIcon,
      plain: true,
      ...options,
    }

    this.loadingInstance = ElMessage(defaultOptions)
    return this.loadingInstance
  }

  /**
   * 关闭加载提示
   */
  close(): void {
    if (this.loadingInstance) {
      this.loadingInstance.close()
      this.loadingInstance = null
    }
  }

  /**
   * 更新加载提示文字
   * @param message 新的提示文字
   */
  update(message: string): void {
    this.close()
    this.show(message)
  }
}

// 创建全局实例
const loadingManager = new LoadingManager()

// 导出便捷函数
export function loadingMessage(message?: string, options?: LoadingOptions) {
  return loadingManager.show(message, options)
}

export function closeLoading() {
  loadingManager.close()
}

export function updateLoading(message: string) {
  loadingManager.update(message)
}

export default loadingManager
