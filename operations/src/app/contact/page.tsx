import { ContactForm } from './contact-form'
import styles from './contact.module.css'

export const metadata = {
  title: '联系 OVOPS｜本地测试演示',
  description: '仅用于 Local/Test 环境的 OVOPS 咨询表单演示。',
}

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.shell}>
          <p className={styles.eyebrow}>OVOPS / CONTACT</p>
          <h1 id="contact-title">聊聊一个具体问题。</h1>
          <p className={styles.intro}>从团队正在处理的资料、流程或协作卡点开始。这里仅用于 Local/Test 演示，不连接生产渠道，也不会发送通知。</p>
        </div>
      </section>
      <section className={styles.content} aria-labelledby="contact-form-title">
        <div className={styles.shell}>
          <div className={styles.context}>
            <p className={styles.eyebrow}>LOCAL / TEST ONLY</p>
            <h2 id="contact-form-title">说明你的情况</h2>
            <p>请只填写本地测试所需的合成信息。目标是在下一个工作日回复，但这不是响应保证。</p>
            <ul>
              <li>不收集电话、附件、预算或敏感数据。</li>
              <li>当前隐私同意版本为 <code>privacy-v1-draft</code>，尚未作为正式隐私文本批准。</li>
              <li>提交成功后会显示本次 Local/Test 演示回执。</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
